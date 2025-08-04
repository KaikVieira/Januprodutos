from django.db import models
from cloudinary.models import CloudinaryField

class Categoria(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Produto(models.Model):
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)

    # Usando CloudinaryField para imagens e vídeos
    imagem = CloudinaryField('imagem', folder='produtos/imagens')
    video = CloudinaryField('video', folder='produtos/videos', blank=True, null=True)

    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True)
    destaque = models.BooleanField(default=False)
    nota = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)  # Ex: 4.9

    link_mercado_livre = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.titulo
