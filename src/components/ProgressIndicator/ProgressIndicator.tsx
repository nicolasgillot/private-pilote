/**
 * A progress indicator component communicates
 * to the user the progress of a particular process.
 */
import * as React from 'react';
import './ProgressIndicator.css';

interface IProgressIndicatorProps {
  progression: number;
}

export default class ProgressIndicator extends React.Component<
  IProgressIndicatorProps,
  {}
> {
  public render() {
    const { progression } = this.props;
    const progressBarValueStyles = {
      width: `${progression}%`,
    };

    return (
      <div className="c-progress">
        <div className="c-progress-bar">
          <span
            className="c-progress-bar__value"
            style={progressBarValueStyles}
          >
            <span className="u-assistive-text">Progress: {progression}%</span>
          </span>
        </div>
      </div>
    );
  }
}
