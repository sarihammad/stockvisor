from fastapi import FastAPI
from routes import stock_routes

app = FastAPI(
    title="StockVisor API",
    description="Backend API for StockVisor",
    version="1.0.0"
)

app.include_router(stock_routes.router)
