import { Foldable } from '@/components/FoldableSchema';
import clsx from 'clsx';
import { ReactNode } from 'react';

type ObjectSchema = { type: 'object'; properties: Record<string, Schema> };
type ArraySchema = { type: 'array'; item: Schema };
type UnionSchema = { type: 'union'; items: Schema[] };
type LiteralSchema = { type: 'literal'; value: any };
type OptionalSchema = { type: 'optional'; value: Schema };
type NullableSchema = { type: 'nullable'; item: Schema };
type RecordSchema = { type: 'record'; elementType: Schema };
type UnknownSchema = { type: 'unknown' };
type StringSchema = { type: 'string' };
type NumberSchema = { type: 'number' };
type BooleanSchema = { type: 'boolean' };
type AnySchema = { type: 'any' };
type DateSchema = { type: 'date' };
type NeverSchema = { type: 'never' };

type Schema =
  | ObjectSchema
  | ArraySchema
  | UnionSchema
  | LiteralSchema
  | OptionalSchema
  | NullableSchema
  | RecordSchema
  | UnknownSchema
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | AnySchema
  | DateSchema
  | NeverSchema;

function getPropertyTypeLabel(schema: Schema) {
  if (schema.type === 'array') {
    return `array of ${getPropertyTypeLabel(schema.item)}s`;
  }
  if (schema.type === 'object') {
    if (Object.keys(schema.properties).length === 0) {
      return 'empty object';
    }
    return 'object';
  }
  if (schema.type === 'string') {
    return 'string';
  }
  if (schema.type === 'number') {
    return 'number';
  }
  if (schema.type === 'boolean') {
    return 'boolean';
  }
  if (schema.type === 'union') {
    const types = schema.items.map(getPropertyTypeLabel);
    // count unique types
    const uniqueTypes = [...new Set(types)].map(type => {
      if (types.filter(t => t === type).length > 1) {
        return type + 's';
      }
      return type;
    });

    return `union of ${uniqueTypes.join(' and ')}`;
  }
  if (schema.type === 'literal') {
    return 'literal';
  }
  if (schema.type === 'optional') {
    return `optional ${getPropertyTypeLabel(schema.value)}`;
  }
  if (schema.type === 'nullable') {
    return `nullable ${getPropertyTypeLabel(schema.item)}`;
  }
  if (schema.type === 'record') {
    return `record of ${getPropertyTypeLabel(schema.elementType)}s`;
  }
  if (schema.type === 'unknown') {
    return 'object';
  }
  if (schema.type === 'any') {
    return 'any value';
  }
  if (schema.type === 'date') {
    return 'date';
  }
  console.log('Unknown schema type', schema);
}

type PropertyTypeLabelProps = Schema;

function PropertyTypeLabel(props: PropertyTypeLabelProps) {
  return <span className='text-xs text-charcole-700'>{getPropertyTypeLabel(props)}</span>;
}

type PropertyLabelProps = Schema & {
  parent?: string;
  name: string;
};

function PropertyLabel({ parent, name, ...rest }: PropertyLabelProps) {
  return (
    <p className='flex items-center gap-1'>
      <code className='leading-none'>
        {parent ? <>{parent}.</> : null}
        <span className='font-bold'>{name}</span>
      </code>
      <PropertyTypeLabel {...rest} />
    </p>
  );
}

interface ObjectSchemaProps {
  schema: ObjectSchema;
  parent?: string;
  className?: string;
}
function ObjectSchema({ schema, parent, className }: ObjectSchemaProps) {
  return (
    <ul className={clsx('rounded-md border border-charcole-900 px-4 py-2 text-white', className)}>
      {Object.keys(schema.properties).map(key => {
        let property = schema.properties[key];
        property = property.type === 'nullable' ? property.item : property;
        property = property.type === 'optional' ? property.value : property;

        const newParent = parent ? `${parent}.${key}` : key;

        if (property.type === 'union') {
          return (
            <li key={key} className='my-4'>
              <PropertyLabel parent={parent} name={key} {...schema.properties[key]} />
              <Foldable title='Show possible variants' closeTitle='Hide possible variants'>
                <ul className=' my-4 rounded-md'>
                  {property.items.map((item, index) => (
                    <li key={index} className='my-4'>
                      <SchemaPreview schema={item} parent={newParent} />
                    </li>
                  ))}
                </ul>
              </Foldable>
            </li>
          );
        }

        if (property.type === 'object') {
          const isEmpty = Object.keys(property.properties).length === 0;
          return (
            <li key={key} className='my-4'>
              <PropertyLabel parent={parent} name={key} {...schema.properties[key]} />
              {!isEmpty ? (
                <Foldable>
                  <SchemaPreview schema={property} parent={newParent} />
                </Foldable>
              ) : null}
            </li>
          );
        }

        if (property.type === 'record' && property.elementType.type === 'object') {
          return (
            <li key={key} className='my-4'>
              <PropertyLabel parent={parent} name={key} {...schema.properties[key]} />
              <Foldable>
                <SchemaPreview schema={property.elementType} parent={newParent} />
              </Foldable>
            </li>
          );
        }

        if (property.type === 'array') {
          const isEmptyObject =
            property.item.type === 'object' && Object.keys(property.item.properties).length === 0;

          return (
            <li key={key} className='my-4'>
              <PropertyLabel parent={parent} name={key} {...schema.properties[key]} />
              {!isEmptyObject ? (
                <Foldable>
                  <SchemaPreview schema={property.item} parent={newParent} />
                </Foldable>
              ) : null}
            </li>
          );
        }

        return (
          <li key={key} className='my-4'>
            <PropertyLabel parent={parent} name={key} {...schema.properties[key]} />
            <SchemaPreview schema={property} parent={newParent} />
          </li>
        );
      })}
    </ul>
  );
}

interface SchemaPreviewProps {
  className?: string;
  schema: Schema;
  parent?: string;
  empty?: ReactNode;
}
export function SchemaPreview({ className, schema, parent, empty }: SchemaPreviewProps) {
  if (schema.type === 'object') {
    if (Object.keys(schema.properties).length === 0) {
      return empty;
    }
    return <ObjectSchema className={className} schema={schema} parent={parent} />;
  }
  if (schema.type === 'array') {
    if (Object.keys(schema.item).length === 0) {
      return empty;
    }
    return <SchemaPreview className={className} schema={schema.item} parent={parent} />;
  }
  if (schema.type === 'any') {
    return empty;
  }
  if (schema.type === 'never') {
    return empty;
  }
  return null;
}
