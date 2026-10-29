from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from django.db import models
# Register your models here.

class Job(models.Model):
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    salary = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.title


class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    user = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    null=True,
    blank=True
)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    reason = models.TextField()
    status = models.CharField(max_length=50, default="Under Review")

    def __str__(self):
        return f"{self.name} - {self.job.title}"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,  null=True,
    blank=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    skills = models.TextField()

class SavedJob(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "job"],
                name="unique_saved_job_per_user"
            )
        ]

    def __str__(self):
        return self.job.title