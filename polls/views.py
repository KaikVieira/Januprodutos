from django.shortcuts import render
from collections import defaultdict
from .models import Produto

def index(request):
    return render(request, 'polls/index.html')

def produtos(request):
    # Busca todos os produtos, ordenados por destaque
    produtos = Produto.objects.all().order_by('-destaque')

    # Agrupar produtos por nome da categoria
    produtos_por_categoria = defaultdict(list)
    for produto in produtos:
        if produto.categoria:
            produtos_por_categoria[produto.categoria.nome].append(produto)
        else:
            produtos_por_categoria['Sem Categoria'].append(produto)

    context = {
        'produtos_por_categoria': dict(produtos_por_categoria)
    }

    return render(request, 'polls/produtos.html', context)
