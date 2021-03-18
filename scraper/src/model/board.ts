import mongoose, { Schema, Document } from 'mongoose';

export interface IBoard extends Document {
    begin: Date,
    category: String,
    content: String,
    crawled_at: Date,
    end: Date,
    num_agree: Number,
    status: String,
    title: String,
    petition_idx: Number,
}

const boardSchema = new mongoose.Schema({
    begin: Date,
    category: String,
    content: String,
    crawled_at: Date,
    end: Date,
    num_agree: Number,
    status: String,
    title: String,
    petition_idx: Number,
});

const model = mongoose.model('Board', boardSchema);

export default model;