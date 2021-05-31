export default (req, res) => {
  if (req.method === "POST") {
    console.log('BODY...', req.body);
    const { message } = req.body;
    res?.socket?.server?.io?.emit("message", message);
    res.status(201).json({ message });
  }
};