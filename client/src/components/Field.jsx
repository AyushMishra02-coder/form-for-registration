import { ChevronDown } from 'lucide-react';

export function Field({ label, name, required = false, hint, full = false, children }) {
  return <div className={`field${full ? ' full' : ''}`}><label htmlFor={name}>{label}{required && <span className="req"> *</span>}</label>{children}<ChevronDown className="select-chevron" size={15} aria-hidden="true" />{hint && <p className="hint">{hint}</p>}</div>;
}

export function TextInput({ label, name, required = false, type = 'text', placeholder, hint, autoComplete, icon: Icon, ...props }) {
  return <Field label={label} name={name} required={required} hint={hint}><span className={`input-wrap${Icon ? ' has-icon' : ''}`}>{Icon && <Icon className="input-icon" size={15} />}<input id={name} name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} {...props} /></span></Field>;
}
