class DataMessage {
  constructor(public status: number, public message: string, public data: string) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export default DataMessage;
