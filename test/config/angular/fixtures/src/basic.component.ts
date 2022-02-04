import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component( { changeDetection: ChangeDetectionStrategy.OnPush } )
export class FooComponent {}
