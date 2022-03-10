from fastapi import APIRouter
from fastapi import Query
from sydengroup.models.users import UserModel
from typing import Optional


router = APIRouter(
    prefix="/ai",
    tags=["AI"],
    responses={404: {"description": "Not found"}},
)

# @router.post("/train")
# async def train():
#     return [{"detail": "Training pipeline"}]

# @router.post("/predict")
# async def predict():
#     return [{"detail": "Prediction pipeline"}]

@router.post("/train")
def train():
    return [{"detail": "Training pipeline"}]

@router.post("/predict")
def predict():
    return [{"detail": "Prediction pipeline"}]