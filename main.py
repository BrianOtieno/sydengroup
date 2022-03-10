from imp import reload
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from sydengroup.routes.api import router as api_router 
from config import engine, Base

app = FastAPI()

# origins = ["http://localhost:8000"]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
) 

app.include_router(api_router)
 
# @app.on_event("startup")
# async def startup_event(): 
#     async with engine.begin() as conn:
#         # await conn.run_sync(Base.metadata.drop_all)
#         await conn.run_sync(Base.metadata.create_all)


@app.get("/")
async def read_root():
    return {"Hello": "World"} 

# @app.get("/")
# def read_root():
#     return {"Hello": "World"} 

