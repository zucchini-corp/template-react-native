

function killServer() {
  port=8081
  service=$(lsof -i :${port})
  kill -9 ${service} | awk '{print $11}'
}
killServer
