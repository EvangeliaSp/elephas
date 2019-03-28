import React, {Component} from 'react';
import konstantina from "../konstantina.PNG";

class About extends Component {
    render() {
        return (
            <div>

                <div className="intro">Materials Used</div>

                <div className="words"><p>I only use materials friendly for the skin. Mostly working with silver and
                    little pieces of art I find in nature such as pieces of wood and stones. I believe that the meaning
                    of jewelry is to express ourselves and not to show a status of money. That is why I try to work with
                    what our nature has to offer rather than use expensive materials.
                </p></div>
                <div className="intro">The creator</div>

                <div className="words"><p>I believe in kindness, support, love and solidarity. I have the luck to be surrounded by wonderful
                    people who inspire me single every day. Have the courage to support your dreams and the strength to
                    support other people’s dreams! Thank you for visiting my little heaven! Special credits to my friends
                    for making a dream come true and for being by my side at my biggest milestones.
                    <br/>
                    Love K.
                </p></div>



                    <div className="intro">About Konstantina</div>
                    <div className="words">Konstantina is Marketing Coordinator in one of the biggest translating
                        companies
                        in Greece.
                        <p>She is completing her Master's in Operations Research and Information Engineering. In 2016
                            she
                            decided to
                            pursue her biggest love, jewellery. She started posting photos of her creations and since
                            then,
                            she started
                            jewelry making classes.</p>
                        <img src={konstantina} alt="Konstantina Manousaki"/>
                        <p> She lives happily in Piraeus with her partner.</p>
                    </div>

                    <br/>


                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>


                </div>


        );
    }

}

export default About;