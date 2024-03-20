class ConvertError extends Error {
  constructor(
    message: string,
    public readonly key: string,
    public readonly lang: string,
  ) {
    super(message);
    this.name = 'ConvertError';
  }
}

export default ConvertError;
