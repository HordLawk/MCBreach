# MCBreach

## Requirements

- Minecraft server running on `localhost:25565` (default);
- RCON enabled on `localhost:25575`;
- Environment variables defined as shown [here](.env.example).

## Dependencies

- [git](https://git-scm.com/downloads);
- [Docker](https://docs.docker.com/engine/install/).

## Download

```bash
git clone https://github.com/HordLawk/MCBreach.git
```

## Build

```bash
cd MCBreach
sudo docker build -t mcbreach .
```

## Deploy

Runs on port `3000`.

```bash
sudo docker run -d --network=host --name mcbreach mcbreach
```

## Update

```bash
git pull
sudo docker build -t mcbreach .
sudo docker stop mcbreach
sudo docker rm mcbreach
sudo docker run -d --network=host --name mcbreach mcbreach
```