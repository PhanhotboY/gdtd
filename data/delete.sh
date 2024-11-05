type=$1
for id in $(sanity documents query "*[_type=='$type']{_id}" | jq -r '.[]._id' | tr '\n' ' '); do
    echo "Deleting $id"
    sanity documents delete "$id"
done
