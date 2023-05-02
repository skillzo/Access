import React from "react";

export default function Receipt({ item, setShowReciept, showReciept }: any) {
  return (
    <div
      onClick={() => {
        setShowReciept(false);
      }}
      className="fixed top-0 left-0 h-screen w-full z-10 bg-[#dbdbee67] flex justify-center items-center"
    >
      {/* Reciept here */}
      <div className="p-12 w-[98%] mx-auto bg-white space-y-6 ">
        <div className="flex justify-between items-center">
          <p>Access</p>
          <p>Logo</p>
        </div>

        <div className="space-y-3 text-center">
          <p className="text-p-blue font-semibold">Transaction Receipt</p>
          <p className="text-p-ash text-sm">
            Generated from AccessMore on 13/04/23 04:47:25
          </p>
        </div>

        <div className="text-sm">
          <TrxInfo
            trx_key="Transaction Amount"
            trx_val={Math.abs(item?.transaction_amount).toLocaleString()}
          />
          <TrxInfo
            trx_key="Transaction Type"
            trx_val={item?.transaction_type}
          />
          <TrxInfo
            trx_key="Transaction Date"
            trx_val={item?.transaction_date}
          />
          <TrxInfo trx_key="Sender" trx_val={item?.sender.toUpperCase()} />
          <div className="flex border-b py-3 justify-between">
            <p className="text-p-orange font-semibold text-xs w-[40%]">
              Beneficiary
            </p>
            <div className="text-p-blue w-[50%] text-xs text-left space-y-2">
              <p>{item?.beneficiary[0].full_name.toUpperCase()}</p>
              <p>{item?.beneficiary[0].account_number.toUpperCase()}</p>
            </div>
          </div>
          <TrxInfo trx_key="Remark" trx_val={item?.remark} />
          <TrxInfo
            trx_key="Transaction Reference"
            trx_val={item?.transaction_ref}
          />
          <TrxInfo
            trx_key="Transaction Status"
            trx_val={item?.transaction_status}
          />
        </div>
      </div>
    </div>
  );
}

const TrxInfo = ({ trx_key, trx_val }: any) => {
  return (
    <div className="flex border-b py-3 justify-between">
      <p className="text-p-orange font-semibold text-xs w-[40%]">{trx_key}</p>
      <p className="text-p-blue w-[50%] text-xs text-left">{trx_val}</p>
    </div>
  );
};
