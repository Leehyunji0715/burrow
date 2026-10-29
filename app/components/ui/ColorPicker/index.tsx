import { LuCheck } from 'react-icons/lu';
import { projectColors } from '~/utils/projectColor';

import type { ProjectColor } from '~/styles/tokens.css';

import * as styles from './styles.css';

const colorNames: Record<ProjectColor, string> = {
  lilac: '라일락',
  mint: '민트',
  pink: '핑크',
  sky: '하늘',
  periwinkle: '페리윙클',
  aqua: '아쿠아',
  mauve: '모브',
  sage: '세이지',
};

type Props = {
  label: string;
  value: ProjectColor;
  onChange: (color: ProjectColor) => void;
};

/** 프로젝트 팔레트 8색 중 하나를 고른다. 키보드로는 Tab 으로 들어와 Space 로 고른다 */
export function ColorPicker({ label, value, onChange }: Props) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{label}</legend>
      <div className={styles.swatches}>
        {projectColors.map((c) => (
          <label
            key={c}
            className={[styles.swatch, styles.color[c]].join(' ')}
            title={colorNames[c]}
          >
            <input
              type='radio'
              name='color'
              value={c}
              checked={value === c}
              onChange={() => onChange(c)}
              className={styles.radio}
              aria-label={colorNames[c]}
            />
            {value === c && <LuCheck aria-hidden='true' className={styles.check} />}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
