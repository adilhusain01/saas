import DodoPayments from 'dodopayments';
const client = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
});
export { client };
//# sourceMappingURL=payments.js.map