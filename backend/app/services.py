import yfinance as yf
import pandas as pd
from datetime import datetime
from sklearn.linear_model import LinearRegression
import numpy as np

def fetch_stock_history(ticker: str):
    """
    Fetch stock data from yfinance.
    """
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1y")
    hist.reset_index(inplace=True)
    return hist.to_dict(orient="records")


def predict_stock_price(ticker: str, date: str):
    """
    Predict the stock price for a specific date using Linear Regression.
    """
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1y")
    hist.reset_index(inplace=True)

    hist['Date'] = pd.to_datetime(hist['Date'])
    hist['Date_ordinal'] = hist['Date'].map(datetime.toordinal)

    X = np.array(hist['Date_ordinal']).reshape(-1, 1)
    y = hist['Close'].values

    model = LinearRegression()
    model.fit(X, y)

    predict_date = datetime.strptime(date, "%Y-%m-%d").toordinal()
    predicted_price = model.predict(np.array([[predict_date]]))[0]
    
    return round(predicted_price, 2)
