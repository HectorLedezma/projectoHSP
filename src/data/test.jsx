import VerticalCarousel from "../components/vcarrousel.jsx";

function Test(){

    const items = [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5'
      ];

    return(
        <div>
            <VerticalCarousel items={items}/>
        </div>
    )
}

export default Test;