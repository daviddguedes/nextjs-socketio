export default (req, res) => {
  if (req.method === "POST") {
    console.log(res);
    const message = req.body.message;
    res?.socket?.server?.io?.emit("message", message);
    res.status(201).json(message);
  }
};