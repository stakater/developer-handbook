{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "developer-handbook.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "developer-handbook.labels.selector" -}}
app: {{ template "developer-handbook.name" . }}
group: {{ .Values.handbook.labels.group }}
provider: {{ .Values.handbook.labels.provider }}
{{- end -}}

{{- define "developer-handbook.labels.stakater" -}}
{{ template "developer-handbook.labels.selector" . }}
version: "{{ .Values.handbook.labels.version }}"
{{- end -}}

{{- define "developer-handbook.labels.chart" -}}
chart: "{{ .Chart.Name }}-{{ .Chart.Version }}"
release: {{ .Release.Name | quote }}
heritage: {{ .Release.Service | quote }}
{{- end -}}
