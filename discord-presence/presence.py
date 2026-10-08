"""Mostra o seu site como atividade no Discord ("Jogando tutulindojogos" + botão pro site).
Precisa: Discord DESKTOP aberto no mesmo PC e este script rodando. Veja LEIA-ME.txt."""
import time
from pypresence import Presence

CLIENT_ID = "COLE_AQUI_O_APPLICATION_ID"        # Application ID do seu app em discord.com/developers
SITE_URL  = "https://SEU-USUARIO.github.io/SEU-REPO/"  # link do seu site (precisa começar com https://)

rpc = Presence(CLIENT_ID)
rpc.connect()
rpc.update(
    details="angel.exe",
    state="y2k forever ✦ psp & fps",
    large_image="icon",                  # nome do arquivo que você sobe em Rich Presence > Art Assets
    large_text="tutulindojogos",
    start=int(time.time()),
    buttons=[{"label": "Visit my site", "url": SITE_URL}],
)
print("Atividade ligada. Deixe esta janela aberta (Ctrl+C para parar).")
try:
    while True:
        time.sleep(15)
except KeyboardInterrupt:
    rpc.clear()
