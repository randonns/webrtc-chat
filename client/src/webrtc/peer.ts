// Google의 public STUN server를 사용한다.
const config = {
  iceServers: [{ urls: "stun:stun.1.google.com:19302" }]
}

export class PeerConnection {
  private connection = new RTCPeerConnection(config)
  offer?: RTCSessionDescriptionInit
  answer?: RTCSessionDescriptionInit
  onIceCandidate?: (candidate: RTCIceCandidate) => void
  onReady?: () => void
  onMessage?: (from: string, msg: string) => void
  channel?: RTCDataChannel

  constructor() {
    this.connection.onicecandidate = ({ candidate }) => {
      if (candidate) this.onIceCandidate?.(candidate)
    }
  }

  setupChannel(channel: RTCDataChannel): void {
    channel.onopen = () => {
      this.onReady?.()
    }

    channel.onerror = error => {
      console.error("CHANNEL ERROR", error)
    }

    channel.onmessage = ({ data }) => {
      const { from, msg } = JSON.parse(data)
      this.onMessage?.(from, msg)
    }

    this.channel = channel
  }

  async createOffer(): Promise<RTCSessionDescriptionInit> {
    // Offer를 보내는 쪽이 채널을 생성한다.
    this.setupChannel(this.connection.createDataChannel("chat"))

    // Connection offer를 생성한다. SDP(Session Description Protocol) 정보를 담고 있다.
    this.offer = await this.connection.createOffer()
    await this.connection.setLocalDescription(this.offer)
    return this.offer
  }

  async createAnswerFromOffer(offer: RTCSessionDescription): Promise<RTCSessionDescriptionInit> {
    // 원격 peer가 createDataChannel로 채널을 생성하면 실행된다.
    // Offer를 받는 쪽은 채널을 생성하지 않고, 원격 채널을 구해온다.
    this.connection.ondatachannel = ({ channel }) => {
      this.setupChannel(channel)
    }

    await this.connection.setRemoteDescription(new RTCSessionDescription(offer))
    this.answer = await this.connection.createAnswer()
    await this.connection.setLocalDescription(this.answer)
    return this.answer
  }

  async acceptAnswer(answer: RTCSessionDescription): Promise<void> {
    await this.connection.setRemoteDescription(answer)
  }

  async addIceCandidate(candidate: RTCIceCandidate): Promise<void> {
    await this.connection.addIceCandidate(candidate)
  }

  send(from: string, msg: string): void {
    this.channel?.send(JSON.stringify({ from, msg }))
  }
}
