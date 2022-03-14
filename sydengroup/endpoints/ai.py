from fastapi import APIRouter
from fastapi import Depends 
from sydengroup.models.authentication import get_current_user
from sydengroup.models.users import UserORM


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
def train(current_user: UserORM = Depends(get_current_user)):
    return [{"detail": "Training pipeline"}]

@router.post("/predict")
def predict(current_user: UserORM = Depends(get_current_user)):
    return [{"detail": "Prediction pipeline"}]

async def pipeline():
    pass
