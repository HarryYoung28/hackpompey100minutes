import Quiz from "@/components/Quiz"

export default function Home(){
    // variables

    // functions

    // components
    return(
        <div>
            <Quiz onComplete={(answers) => setAnswers(answers)}/>
        </div>
    )

}