

# Create your views here.
from rest_framework import generics
from django.contrib.auth import authenticate,login,logout
from django.middleware.csrf import get_token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import Job,Application,Profile,SavedJob
from .serializers import JobSerializer,ApplicationSerializer,ProfileSerializer,SavedJobSerializer
from rest_framework.permissions import IsAuthenticated

class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class ApplicationListCreateView(generics.ListCreateAPIView):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return Application.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ApplicationDeleteView(generics.DestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

class ProfileListCreateView(generics.ListCreateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfileUpdateView(generics.UpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

class SavedJobListCreateView(generics.ListCreateAPIView):
    serializer_class = SavedJobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedJob.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SavedJobDeleteView(generics.DestroyAPIView):
    serializer_class = SavedJobSerializer

    def get_queryset(self):
        return SavedJob.objects.filter(user=self.request.user)
    
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if user is not None:
            login(request, user)
            print("SESSION KEY:", request.session.session_key)

            return Response({
        "message": "Login successful",
        "user_id": user.id,
        "username": user.username
    })

        return Response({
            "message": "Invalid username or password"
        }, status=400)

class CurrentUserView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                "logged_in": True,
                "user_id": request.user.id,
                "username": request.user.username
            })

        return Response({
            "logged_in": False
        })

class LogoutView(APIView):
    authentication_classes = []

    def post(self, request):
        logout(request)

        return Response({
            "message": "Logout successful"
        })
    
class CSRFTokenView(APIView):
    authentication_classes = []

    def get(self, request):
        return Response({
            "csrfToken": get_token(request)
        })