import { Component } from 'react';
import './toggle.css';

interface ToggleProps {
    isChecked: boolean;
    onChange: (e: any) => void;
}

export class Toggle extends Component<ToggleProps, any>{

    constructor(props: ToggleProps) {
        super(props);
        this.state = {
            theme: {
                backgroundColor: 'gray',
            }
        }
    }

    setTheme(theme: string): void {
        this.setState({
            theme: {
                backgroundColor: theme,
            }
        })
    }

    render() {
        return <div className="toggle">
            <label className="switch">
                <input type="checkbox"
                    checked={this.props.isChecked}
                    onChange={(e) => {
                        this.setTheme("gray");
                        // this.props.onChange(e);
                    }} />
                <span className="slider round"></span>
            </label>
        </div>
    }
}