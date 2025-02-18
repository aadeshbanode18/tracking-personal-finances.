import dbConnect from '../../utils/dbConnect';
import Transaction from '../../models/Transaction';

export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method === 'GET') {
    const transactions = await Transaction.find({}).sort({ date: -1 });
    res.status(200).json(transactions);
  } else if (req.method === 'POST') {
    const { amount, description, date } = req.body;
    const transaction = new Transaction({ amount, description, date });
    await transaction.save();
    res.status(201).json(transaction);
  } else if (req.method === 'DELETE') {
    await Transaction.findByIdAndDelete(req.query.id);
    res.status(204).end();
  }
}
