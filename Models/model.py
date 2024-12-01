# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Lasso
import pickle

transaction_dataset = pd.read_csv("Transactions_CSV.csv")

transaction_dataset.replace(
    {
        "Fuel_Type": {"Petrol": 0, "Diesel": 1, "CNG": 2},
        "Seller_Type": {"Dealer": 0, "Individual": 1},
        "Transmission": {"Manual": 0, "Automatic": 1},
    },
    inplace=True,
)

X = transaction_dataset.drop(
    [
        "Txhash",
        "Blockno",
        "UnixTimestamp",
        "From",
        "TO",
        "Value_IN",
        "ContractAddress",
        "Historical",
        "Status",
        "DateTime (UTC)" "ErrCode",
        "Method",
    ],
    axis=1,
)
Y = transaction_dataset["TxnFee"]

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.1, random_state=2)

lr = Lasso()
lr.fit(X_train, Y_train)

pickle.dump(lr, open("ml_model.pkl", "wb"))
