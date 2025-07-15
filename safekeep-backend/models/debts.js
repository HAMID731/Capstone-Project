const debtSchema = {
    id: String,
    customerName: String,
    amount: Number,
    dueDate: Date,
    paid: {
        type: Boolean,
        default: false
    }
};

module.exports = debtSchema;
