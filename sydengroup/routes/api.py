from fastapi import APIRouter
from sydengroup.endpoints import ai, users

router = APIRouter()
router.include_router(ai.router)
router.include_router(users.router)