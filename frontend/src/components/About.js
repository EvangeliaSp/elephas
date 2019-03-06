import React, {Component} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import konstantina from "../konstantina.PNG";

class About extends Component {
    render() {
        return (
            <div>

                    <div className="intro">About Konstantina</div>
                    <div className="words">Konstantina is Marketing Coordinator in one of the biggest translaring
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
                        <p> She lives happily in Piraeus with her companion.</p>
                    </div>
                    <div className="intro">Elephas' Materials</div>

                    <div className="words"><p>Lopsopsdnfsdin</p>
                        <br/>

                        <p>ddfdsfdsfsdgdfdd</p>
                        <br/>

                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>





                    </div>




            </div>
        );
    }

}

export default About;