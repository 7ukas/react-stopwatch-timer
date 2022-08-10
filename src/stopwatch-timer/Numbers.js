const margins = [
    '0px 0px 0px 0px',          // -
    '30px 0px 0px 90px',        // 5
    '98px 0px 0px 160px',       // 10
    '185px 0px 0px 183px',      // 15
    '280px 0px 0px 159px',      // 20
    '346px 0px 0px 91px',       // 25
    '370px 0px 0px 0px',        // 30
    '348px 0px 0px -88px',      // 35
    '280px 0px 0px -157px',     // 40
    '187px 0px 0px -182px',     // 45
    '97px 0px 0px -158px',      // 50
    '28px 0px 0px -90px',       // 55
    '5px 0px 0px 0px'           // 60
]

const Numbers = () => {
    let numbers = [];
  
    for (let i = 5; i <= 60; i += 5) {
        numbers.push (
            <div key={`number${i}`} className={'numbers'} 
                style={{
                    margin: `${margins[i/5]}`
                }}>{i}
            </div>
        );
    }

    return (
        <>{numbers.map(number => number)}</>
    )
}

export default Numbers