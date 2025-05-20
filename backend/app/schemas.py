from pydantic import BaseModel

class StockHistoryRequest(BaseModel):
    ticker: str

class StockPredictionRequest(BaseModel):
    date: str
