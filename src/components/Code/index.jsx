function Code(props) {
    const {
        submittedData,
    } = props;

    if (!submittedData) {
        return null;
    }

    return (
        <pre className='code'>
            {JSON.stringify(submittedData, null, 2)}
        </pre>
    );
}

export default Code;
