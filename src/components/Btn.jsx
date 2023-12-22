import { Button } from './base';

export default function Btn({ sx, className, ...props }) {
    return <Button sx={sx} className={`btn ${className || ''}`} {...props} />;
}
