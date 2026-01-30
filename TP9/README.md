# Architecture MVC - Battle Royale Game

## 📋 Structure du Projet

Ce projet suit le pattern **Model-View-Controller (MVC)** pour une meilleure organisation et maintenabilité du code.

### Frontend (JavaScript/ES6 Modules)

```
frontend/
├── main.js                 # Point d'entrée principal
├── models/
│   ├── Game.js            # Model - État global du jeu
│   └── Player.js          # Model - Données du joueur
├── views/
│   └── GameView.js        # View - Rendu canvas du jeu
└── controllers/
    └── GameController.js  # Controller - Logique métier
```

**Rôles:**

- **Models** : Stockent et gèrent les données (Game, Player)
- **Views** : Affichent les données à l'écran (GameView - rendu canvas)
- **Controllers** : Gèrent la logique métier et la communication (GameController - WebSocket, inputs)

### Backend (Python/FastAPI)

```
backend/
├── main.py               # Point d'entrée - Routes FastAPI
├── db.py                 # Gestion base de données
├── models/
│   ├── Game.py          # Model - État du jeu serveur
│   └── Player.py        # Model - Données joueur serveur
└── controllers/
    └── GameController.py # Controller - Logique métier
```

**Rôles:**

- **Models** : Représentent les données métier (Player, Game)
- **Controllers** : Implémentent la logique du jeu (boucle de jeu, combat, persistance)
- **Main** : Expose les routes HTTP/WebSocket

## 🎮 Flux de Données MVC

### Frontend

```
User Input
    ↓
GameController (collecte les inputs)
    ↓
WebSocket → Serveur
    ↓
Game Model (reçoit les données du serveur)
    ↓
GameView (affiche sur le canvas)
```

### Backend

```
WebSocket ← Client
    ↓
GameController (traite l'input)
    ↓
Game & Player Models (mise à jour de l'état)
    ↓
GameController (sauvegarde en BD si nécessaire)
    ↓
WebSocket → Tous les clients
```

## 🚀 Démarrage du Projet

### 1. Backend

```bash
cd backend
python main.py
# Le serveur démarre sur ws://localhost:8000
```

### 2. Frontend

Ouvrir `index.html` dans un navigateur (ou utiliser un serveur local)

## 📚 Architecture Détaillée

### Frontend - GameController

```
- connectToServer(name, skinPath) : Connecte au serveur WebSocket
- sendInput() : Envoie les inputs du joueur
- setInputState(key, value) : Met à jour l'état des touches
- getGameState() : Retourne le modèle Game
```

### Frontend - Game Model

```
- update(gameStateFromServer) : Reçoit les données du serveur
- getAllPlayers() : Liste tous les joueurs
- getPlayer(id) : Récupère un joueur spécifique
```

### Frontend - Player Model

```
- update(data) : Met à jour les données depuis le serveur
- interpolate(alpha) : Lisse l'animation de mouvement
- animate() : Joue l'animation de marche
```

### Frontend - GameView

```
- render() : Affiche le jeu sur le canvas
- resizeCanvas(w, h) : Adapte le canvas à la fenêtre
```

### Backend - GameController

```
- add_player(ws, name, skin_path, ip) : Ajoute un joueur
- handle_input(player_id, data) : Traite les inputs
- game_loop() : Boucle principale (20 ticks/sec)
- update() : Met à jour la physique et logique
- broadcast_state() : Envoie l'état à tous les clients
```

### Backend - Game Model

```
- add_player(player) : Ajoute un joueur au jeu
- remove_player(player_id) : Supprime un joueur
- is_game_over() : Vérifie si la partie est terminée
- to_dict() : Exporte l'état pour les clients
```

### Backend - Player Model

```
- update_movement(dt) : Traite le mouvement
- update_stats() : Met à jour les stats en fonction du niveau
- get_attack_hitbox() : Retourne la hitbox d'attaque
- to_dict() : Exporte les données pour les clients
```

## 🔄 Cycle de Jeu

1. **Pré-game** (5 sec) : Attente des joueurs
2. **Game Running** : Joueurs se battent
3. **Game Over** : Attente 10 sec avant reset
4. **Sauvegarde** : Résultats enregistrés en BD

## 🛢️ Base de Données

Tables principales:

- `players` : Enregistrement des joueurs
- `games` : Historique des parties avec stats

## 🎯 Avantages du Pattern MVC

✅ **Séparation des préoccupations** : Chaque classe a une seule responsabilité
✅ **Réutilisabilité** : Les models peuvent être utilisés différemment
✅ **Testabilité** : Facile de tester chaque composant indépendamment
✅ **Maintenabilité** : Code organisé et facile à modifier
✅ **Scalabilité** : Structure prête pour l'évolution du projet

## 🐛 Débogage

Vérifiez les logs du serveur et de la console du navigateur pour le débogage.

Konami codes disponibles:

- `L+U+L+U+R+D+R+D+L+L` : +5 niveau
- `U+R+L+U+R` : Vitesse x5
