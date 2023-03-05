import Select from 'react-select';
import { useDispatch } from 'react-redux';
import {
  useBoardOptionsSelector,
  useSelectedBoardOptionSelector,
} from 'store/slices/kanban/selectors';
import { switchBoard } from 'store/slices/kanban';

import styles from './SwitchBoard.module.scss';

const SwitchBoard = () => {
  const dispatch = useDispatch();

  const selectedOption = useSelectedBoardOptionSelector();
  const boardsOption = useBoardOptionsSelector();

  const changeBoardHandler = (option: { value: string; label: string } | null) => {
    if (option) {
      dispatch(switchBoard({ selectedBoardId: option.value }));
    }
  };

  return (
    <Select
      value={selectedOption}
      onChange={changeBoardHandler}
      options={boardsOption}
      className={styles.select}
    />
  );
};

export { SwitchBoard };
