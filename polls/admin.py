from django.contrib import admin
from .models import Produto, Categoria

@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'categoria', 'preco', 'destaque')
    list_filter = ('categoria',)
    search_fields = ('titulo', 'descricao')
    fields = (
        'titulo', 'descricao', 'preco', 'imagem', 'video',
        'categoria', 'destaque', 'nota', 'link_mercado_livre'
    )

admin.site.register(Categoria)
