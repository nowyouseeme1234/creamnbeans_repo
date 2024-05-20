import React, { useState } from 'react';

function ToggleButton({ buttonName, handleToggle, isActive }) {
    const [toggleState, setToggleState] = useState(isActive || false);

    const handleClick = () => {
        const newToggleState = !toggleState;
        setToggleState(newToggleState);
        handleToggle(buttonName, newToggleState);
    };

    return (
        <button
            type="button"
            className={`font-poppins border-black border toggle-button rounded-lg px-1 mb-5 ${toggleState ? 'active text-white border-white bg-green-500' : 'bg-red-500'
                }`}
            onClick={handleClick}
        >
            {buttonName}
        </button>
    );
}

export default ToggleButton;