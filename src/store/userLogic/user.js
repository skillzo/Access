export let users = [];
class User {
  #transactions = [3000000];
  transaction_details = [];
  constructor(fullname, username, pin, trx24) {
    this.full_name = fullname;
    this.username = username;
    this.password = pin;
    transfer_24hrs = trx24;
  }
  // apis
}

// {
//   id: uuidv4(),
//   full_name: "Chukwu Emmanuel Oluwatobi",
//   userName: "skillzo",
//   transaction: [40000, 700000, -800000, 500000],
//   password: "skillzo",
//   transfer_24hrs: 2000000,
//   transaction_details: [
//     {
//       transaction_amount: 1000000,
//       transaction_type: "username",
//       transaction_date: "2023-03-27T00:56:50.528Z",
//       sender: "skillo",
//       beneficiary: [
//         {
//           full_name: "Jacinta Uzoechina Ijeoma",
//           account_number: "0098220998",
//           bank_name: "access bank",
//         },
//       ],
//       remark:
//         "TRF/null/FRM EMMANURL OLUWATOBI CHUKWU TO DAMILOLA FUNMILOLA OLAYIWOLA",
//       transaction_ref: "NX0001000100010101",
//       transaction_status: "Successful",
//     },
//   ],
// },
