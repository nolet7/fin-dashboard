{{/*
Expand the name of the chart.
*/}}
{{- define "financehub.name" -}}
{{- .Chart.Name -}}
{{- end }}

{{/*
Return the fully qualified name of the chart.
*/}}
{{- define "financehub.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{/*
Common labels for all resources.
*/}}
{{- define "financehub.labels" -}}
app.kubernetes.io/name: {{ include "financehub.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

