import Button from 'components/Button';
import { Steps } from 'containers/PrivatePilote/types';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface IPrivatePiloteItemProps {
  item: {
    id: number;
    name: string;
  };
  selected: boolean;
  step: Steps;
  onClick: (id: number) => void;
}

const PrivatePiloteItem: React.StatelessComponent<IPrivatePiloteItemProps> = ({
  item: { id, name },
  onClick,
  selected,
  step,
}) => {
  const renderSelectedLabel = (
    <span className="c-private-pilote__item-selected-label">
      <FormattedMessage id="PrivatePilote.selectedLabelText" />
    </span>
  );
  const handleClick = () => {
    onClick(id);
  };

  return (
    <li className="c-private-pilote__item" key={name}>
      {selected ? renderSelectedLabel : null}
      <Button onClick={handleClick} title={name}>
        <img
          alt=""
          height="81"
          src={`src/images/content/${step}/${id}-thumbnail@x2.png`}
          width="81"
        />
      </Button>
    </li>
  );
};

export default PrivatePiloteItem;
