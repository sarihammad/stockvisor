from fastapi import APIRouter, HTTPException
from app.schemas import StockHistoryRequest, StockPredictionRequest
from app.services import fetch_stock_history, predict_stock_price

router = APIRouter(
    prefix="/api/stocks",
    tags=["Stocks"]
)

@router.get("/{ticker}/history")
def get_stock_history(ticker: str):
    try:
        data = fetch_stock_history(ticker)
        return {"ticker": ticker, "history": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{ticker}/predict")
def predict_price(ticker: str, request: StockPredictionRequest):
    try:
        predicted_price = predict_stock_price(ticker, request.date)
        return {"ticker": ticker, "date": request.date, "predicted_price": predicted_price}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
