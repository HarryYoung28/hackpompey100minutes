import ActivitiesList from "@/components/activities"
import database from '@/lib/database.json'

export default function Activities(){
    return(
        <ActivitiesList data={ database }/>
    )
}