function withPayload<T>() {
  return (t: T) => ({ payload: t });
}

export default withPayload;
