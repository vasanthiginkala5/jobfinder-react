from django.urls import path
from .views import (
    JobListCreateView,
    JobDetailView,
    ApplicationListCreateView,
    ApplicationDeleteView,ProfileListCreateView,ProfileUpdateView,SavedJobListCreateView,SavedJobDeleteView,LoginView,CurrentUserView,LogoutView,CSRFTokenView
)

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("current-user/", CurrentUserView.as_view(), name="current-user"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("csrf/", CSRFTokenView.as_view(), name="csrf"),
    path("jobs/", JobListCreateView.as_view(), name="job-list"),
    path("jobs/<int:pk>/", JobDetailView.as_view(), name="job-detail"),

    path(
        "applications/",
        ApplicationListCreateView.as_view(),
        name="application-list"
    ),

    path(
        "applications/<int:pk>/",
        ApplicationDeleteView.as_view(),
        name="application-delete"
    ),
    path(
    "profiles/",
    ProfileListCreateView.as_view(),
    name="profile-list"
),
    path(
    "profiles/<int:pk>/",
    ProfileUpdateView.as_view(),
    name="profile-update"
),
path(
    "saved-jobs/",
    SavedJobListCreateView.as_view(),
    name="saved-job-list"
),
path(
    "saved-jobs/<int:pk>/",
    SavedJobDeleteView.as_view(),
    name="saved-job-delete"
),
]