FILE="/home/t800/Projects/bsaunitsingles/bsaunitsingles.http"
TOKEN="token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGVkNTE3OTQwY2UwNWE2MTZiNGFkOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjUyMTE3NywiZXhwIjoxNjQyNzgwMzc3fQ.TckAQUrj4PYABF9gMRHtz1xbIN30z6oqdtGzOid26AY"
URL=http://localhost:5000/api/products/
#DATA=\
#{\
#  "title": "Motorcyclesss", "desc": "This is my favorite, I dont want to sell it...", \
#  "img": "https://www.motorcycle.com/blog/wp-content/uploads/2020/01/012220-2020-Triumph-Tiger-1200-Desert-Edition-LHS.jpg", \
#  "categories": ["Moto"], \
#  "sku": "MOTO-TIGERAAAAA", \
#  "model": ["Triumph", "Tiger"], \
#  "price": 16000, \
#  "inStock": true, \
#  "onHand": 2 \
#}\n


#
#curl -H "Content-Type: application/json" \
#-H $TOKEN \
#-X POST  \
#-d $DATA \
#$URL

#for i in {0..4777}; do

# CLEAR DB
curl -H "Content-Type: application/json" \
-H "token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGVkNTE3OTQwY2UwNWE2MTZiNGFkOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MzgxODE4NSwiZXhwIjoxNjQ0MDc3Mzg1fQ.reR5NZXMkpNULcRAgpJSW35XvwZ5uAAfK7J9mP17HmI" \
-X DELETE \
http://localhost:5000/api/products && \
echo "database cleared"

declare -i array_length
array_length=$(jq 'length' /home/t800/Projects/bsaunitsingles/last_pushed.json)
for i in {0..4790}; do
#for i in {0..$(jq 'length' /home/t800/Projects/bsaunitsingles/next_pushed.json)}; do
  echo "pushing item $i of 4790"
  curl -s -o /dev/null -H "token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGVkNTE3OTQwY2UwNWE2MTZiNGFkOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MzgxODE4NSwiZXhwIjoxNjQ0MDc3Mzg1fQ.reR5NZXMkpNULcRAgpJSW35XvwZ5uAAfK7J9mP17HmI" \
  -H "Content-Type: application/json" \
  -X POST \
  http://localhost:5000/api/products \
  -d "$(jq '.['$i']' /home/t800/Projects/bsaunitsingles/weight_pushed.json)"
  #sleep 1
#  break
done
