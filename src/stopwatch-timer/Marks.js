const Marks = () => {
    let marks = [];
  
    for (let i = 1; i <= 60; i++) {
        marks.push (
            <div key={`mark${i}`} className={'marks'} 
                style={{
                    transform: `rotate(${i*6}deg)`,
                    width: i % 5 === 0 ? '2px' : '1px',
                    zIndex: i % 5 === 0 ? '1' : '0',
                    backgroundColor: i % 5 === 0 ? 'rgb(140, 140, 140)' : 'rgb(110, 110, 110)'
                }}>
            </div>
        );
    }

    return (
        <>{marks.map(mark => mark)}</>
    )
}

export default Marks